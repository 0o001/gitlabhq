import axios from '~/lib/utils/axios_utils';
import { s__ } from '~/locale';
import {
  convertObjectPropsToCamelCase,
  parseIntPagination,
  normalizeHeaders,
} from '~/lib/utils/common_utils';

import pollIntervalQuery from './queries/poll_interval.query.graphql';
import environmentToRollbackQuery from './queries/environment_to_rollback.query.graphql';
import environmentToDeleteQuery from './queries/environment_to_delete.query.graphql';
import pageInfoQuery from './queries/page_info.query.graphql';

const buildErrors = (errors = []) => ({
  errors,
  __typename: 'LocalEnvironmentErrors',
});

const mapNestedEnvironment = (env) => ({
  ...convertObjectPropsToCamelCase(env, { deep: true }),
  __typename: 'NestedLocalEnvironment',
});
const mapEnvironment = (env) => ({
  ...convertObjectPropsToCamelCase(env),
  __typename: 'LocalEnvironment',
});

export const resolvers = (endpoint) => ({
  Query: {
    environmentApp(_context, { page, scope }, { cache }) {
      return axios.get(endpoint, { params: { nested: true, page, scope } }).then((res) => {
        const headers = normalizeHeaders(res.headers);
        const interval = headers['POLL-INTERVAL'];
        const pageInfo = { ...parseIntPagination(headers), __typename: 'LocalPageInfo' };

        if (interval) {
          cache.writeQuery({ query: pollIntervalQuery, data: { interval: parseFloat(interval) } });
        } else {
          cache.writeQuery({ query: pollIntervalQuery, data: { interval: undefined } });
        }

        cache.writeQuery({
          query: pageInfoQuery,
          data: { pageInfo },
        });

        return {
          availableCount: res.data.available_count,
          environments: res.data.environments.map(mapNestedEnvironment),
          reviewApp: {
            ...convertObjectPropsToCamelCase(res.data.review_app),
            __typename: 'ReviewApp',
          },
          stoppedCount: res.data.stopped_count,
          __typename: 'LocalEnvironmentApp',
        };
      });
    },
    folder(_, { environment: { folderPath } }) {
      return axios.get(folderPath, { params: { per_page: 3 } }).then((res) => ({
        availableCount: res.data.available_count,
        environments: res.data.environments.map(mapEnvironment),
        stoppedCount: res.data.stopped_count,
        __typename: 'LocalEnvironmentFolder',
      }));
    },
    isLastDeployment(_, { environment }) {
      // eslint-disable-next-line @gitlab/require-i18n-strings
      return environment?.lastDeployment?.['last?'];
    },
  },
  Mutation: {
    stopEnvironment(_, { environment }) {
      return axios
        .post(environment.stopPath)
        .then(() => buildErrors())
        .catch(() => {
          return buildErrors([
            s__('Environments|An error occurred while stopping the environment, please try again'),
          ]);
        });
    },
    deleteEnvironment(_, { environment: { deletePath } }) {
      return axios
        .delete(deletePath)
        .then(() => buildErrors())
        .catch(() =>
          buildErrors([
            s__(
              'Environments|An error occurred while deleting the environment. Check if the environment stopped; if not, stop it and try again.',
            ),
          ]),
        );
    },
    rollbackEnvironment(_, { environment, isLastDeployment }) {
      return axios
        .post(environment?.retryUrl)
        .then(() => buildErrors())
        .catch(() => {
          buildErrors([
            isLastDeployment
              ? s__(
                  'Environments|An error occurred while re-deploying the environment, please try again',
                )
              : s__(
                  'Environments|An error occurred while rolling back the environment, please try again',
                ),
          ]);
        });
    },
    setEnvironmentToDelete(_, { environment }, { client }) {
      client.writeQuery({
        query: environmentToDeleteQuery,
        data: { environmentToDelete: environment },
      });
    },
    setEnvironmentToRollback(_, { environment }, { client }) {
      client.writeQuery({
        query: environmentToRollbackQuery,
        data: { environmentToRollback: environment },
      });
    },
    cancelAutoStop(_, { environment: { autoStopPath } }) {
      return axios
        .post(autoStopPath)
        .then(() => buildErrors())
        .catch((err) =>
          buildErrors([
            err?.response?.data?.message ||
              s__('Environments|An error occurred while canceling the auto stop, please try again'),
          ]),
        );
    },
  },
});

import { GlAlert, GlLoadingIcon } from '@gitlab/ui';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import { mountExtended, shallowMountExtended } from 'helpers/vue_test_utils_helper';
import createMockApollo from 'helpers/mock_apollo_helper';
import waitForPromises from 'helpers/wait_for_promises';
import OrganizationsRoot from '~/crm/components/organizations_root.vue';
import NewOrganizationForm from '~/crm/components/new_organization_form.vue';
import { NEW_ROUTE_NAME } from '~/crm/constants';
import routes from '~/crm/routes';
import getGroupOrganizationsQuery from '~/crm/components/queries/get_group_organizations.query.graphql';
import { getGroupOrganizationsQueryResponse } from './mock_data';

describe('Customer relations organizations root app', () => {
  Vue.use(VueApollo);
  Vue.use(VueRouter);
  let wrapper;
  let fakeApollo;
  let router;

  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findRowByName = (rowName) => wrapper.findAllByRole('row', { name: rowName });
  const findIssuesLinks = () => wrapper.findAllByTestId('issues-link');
  const findNewOrganizationButton = () => wrapper.findByTestId('new-organization-button');
  const findNewOrganizationForm = () => wrapper.findComponent(NewOrganizationForm);
  const findError = () => wrapper.findComponent(GlAlert);
  const successQueryHandler = jest.fn().mockResolvedValue(getGroupOrganizationsQueryResponse);

  const basePath = '/groups/flightjs/-/crm/organizations';

  const mountComponent = ({
    queryHandler = successQueryHandler,
    mountFunction = shallowMountExtended,
    canAdminCrmOrganization = true,
  } = {}) => {
    fakeApollo = createMockApollo([[getGroupOrganizationsQuery, queryHandler]]);
    wrapper = mountFunction(OrganizationsRoot, {
      router,
      provide: { canAdminCrmOrganization, groupFullPath: 'flightjs', groupIssuesPath: '/issues' },
      apolloProvider: fakeApollo,
    });
  };

  beforeEach(() => {
    router = new VueRouter({
      base: basePath,
      mode: 'history',
      routes,
    });
  });

  afterEach(() => {
    wrapper.destroy();
    fakeApollo = null;
    router = null;
  });

  it('should render loading spinner', () => {
    mountComponent();

    expect(findLoadingIcon().exists()).toBe(true);
  });

  describe('new organization button', () => {
    it('should exist when user has permission', () => {
      mountComponent();

      expect(findNewOrganizationButton().exists()).toBe(true);
    });

    it('should not exist when user has no permission', () => {
      mountComponent({ canAdminCrmOrganization: false });

      expect(findNewOrganizationButton().exists()).toBe(false);
    });
  });

  describe('new organization form', () => {
    it('should not exist by default', async () => {
      mountComponent();
      await waitForPromises();

      expect(findNewOrganizationForm().exists()).toBe(false);
    });

    it('should exist when user clicks new contact button', async () => {
      mountComponent();

      findNewOrganizationButton().vm.$emit('click');
      await waitForPromises();

      expect(findNewOrganizationForm().exists()).toBe(true);
    });

    it('should exist when user navigates directly to /new', async () => {
      router.replace({ name: NEW_ROUTE_NAME });
      mountComponent();
      await waitForPromises();

      expect(findNewOrganizationForm().exists()).toBe(true);
    });

    it('should not exist when form emits close', async () => {
      router.replace({ name: NEW_ROUTE_NAME });
      mountComponent();

      findNewOrganizationForm().vm.$emit('close');
      await waitForPromises();

      expect(findNewOrganizationForm().exists()).toBe(false);
    });
  });

  it('should render error message on reject', async () => {
    mountComponent({ queryHandler: jest.fn().mockRejectedValue('ERROR') });
    await waitForPromises();

    expect(findError().exists()).toBe(true);
  });

  describe('on successful load', () => {
    it('should not render error', async () => {
      mountComponent();
      await waitForPromises();

      expect(findError().exists()).toBe(false);
    });

    it('renders correct results', async () => {
      mountComponent({ mountFunction: mountExtended });
      await waitForPromises();

      expect(findRowByName(/Test Inc/i)).toHaveLength(1);
      expect(findRowByName(/VIP/i)).toHaveLength(1);
      expect(findRowByName(/120/i)).toHaveLength(1);

      const issueLink = findIssuesLinks().at(0);
      expect(issueLink.exists()).toBe(true);
      expect(issueLink.attributes('href')).toBe(
        '/issues?scope=all&state=opened&crm_organization_id=2',
      );
    });
  });
});

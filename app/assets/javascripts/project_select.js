/* eslint-disable func-names, space-before-function-paren, wrap-iife, prefer-arrow-callback, no-var, comma-dangle, object-shorthand, one-var, one-var-declaration-per-line, no-else-return, quotes, max-len */
import Api from './api';
import ProjectSelectComboButton from './project_select_combo_button';

(function () {
  this.ProjectSelect = (function () {
    function ProjectSelect() {
      $('.ajax-project-select').each(function(i, select) {
        var placeholder;
        const simpleFilter = $(select).data('simple-filter') || false;
        this.groupId = $(select).data('group-id');
        this.includeGroups = $(select).data('include-groups');
<<<<<<< HEAD
        this.allProjects = $(select).data('allprojects') || false;
=======
        this.allProjects = $(select).data('all-projects') || false;
>>>>>>> bfb5107ae720232a15060ee55feba213ee7dd097
        this.orderBy = $(select).data('order-by') || 'id';
        this.withIssuesEnabled = $(select).data('with-issues-enabled');
        this.withMergeRequestsEnabled = $(select).data('with-merge-requests-enabled');

        placeholder = "Search for project";
        if (this.includeGroups) {
          placeholder += " or group";
        }

        $(select).select2({
          placeholder: placeholder,
          minimumInputLength: 0,
          query: (function (_this) {
            return function (query) {
              var finalCallback, projectsCallback;
              finalCallback = function (projects) {
                var data;
                data = {
                  results: projects
                };
                return query.callback(data);
              };
              if (_this.includeGroups) {
                projectsCallback = function (projects) {
                  var groupsCallback;
                  groupsCallback = function (groups) {
                    var data;
                    data = groups.concat(projects);
                    return finalCallback(data);
                  };
                  return Api.groups(query.term, {}, groupsCallback);
                };
              } else {
                projectsCallback = finalCallback;
              }
              if (_this.groupId) {
                return Api.groupProjects(_this.groupId, query.term, projectsCallback);
              } else {
                return Api.projects(query.term, {
                  order_by: _this.orderBy,
                  with_issues_enabled: _this.withIssuesEnabled,
                  with_merge_requests_enabled: _this.withMergeRequestsEnabled,
<<<<<<< HEAD
                  membership: !_this.allProjects
=======
                  membership: !_this.allProjects,
>>>>>>> bfb5107ae720232a15060ee55feba213ee7dd097
                }, projectsCallback);
              }
            };
          })(this),
          id: function(project) {
            if (simpleFilter) return project.id;
            return JSON.stringify({
              name: project.name,
              url: project.web_url,
            });
          },
          text: function (project) {
            return project.name_with_namespace || project.name;
          },
          dropdownCssClass: "ajax-project-dropdown"
        });
        if (simpleFilter) return select;
        return new ProjectSelectComboButton(select);
      });
    }

    return ProjectSelect;
  })();
}).call(window);

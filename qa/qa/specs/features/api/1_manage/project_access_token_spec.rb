# frozen_string_literal: true

module QA
  RSpec.describe 'Manage' do
    describe 'Project access token', product_group: :authentication_and_authorization do
      before(:all) do
        @project_access_token = QA::Resource::ProjectAccessToken.fabricate_via_api! do |pat|
          pat.project = create(:project, :with_readme)
        end

        @user_api_client = Runtime::API::Client.new(:gitlab, personal_access_token: @project_access_token.token)
      end

      context 'for the same project' do
        it 'can be used to create a file via the project API', testcase: 'https://gitlab.com/gitlab-org/gitlab/-/quality/test_cases/347858' do
          expect do
            create(:file,
              api_client: @user_api_client,
              project: @project_access_token.project,
              branch: "new_branch_#{SecureRandom.hex(8)}")
          rescue StandardError => e
            QA::Runtime::Logger.error("Full failure message: #{e.message}")
            raise
          end.not_to raise_error
        end

        it 'can be used to commit via the API', testcase: 'https://gitlab.com/gitlab-org/gitlab/-/quality/test_cases/347859' do
          expect do
            Resource::Repository::Commit.fabricate_via_api! do |commit|
              commit.api_client = @user_api_client
              commit.project = @project_access_token.project
              commit.branch = "new_branch_#{SecureRandom.hex(8)}"
              commit.start_branch = @project_access_token.project.default_branch
              commit.commit_message = 'Add new file'
              commit.add_files([{ file_path: "text-#{SecureRandom.hex(8)}.txt", content: 'new file' }])
            end
          rescue StandardError => e
            QA::Runtime::Logger.error("Full failure message: #{e.message}")
            raise
          end.not_to raise_error
        end
      end

      context 'for a different project' do
        before(:all) do
          @different_project = Resource::Project.fabricate!
        end

        it 'cannot be used to create a file via the project API', testcase: 'https://gitlab.com/gitlab-org/gitlab/-/quality/test_cases/347860' do
          expect do
            create(:file,
              api_client: @user_api_client,
              project: @different_project,
              branch: "new_branch_#{SecureRandom.hex(8)}")
          end.to raise_error(Resource::ApiFabricator::ResourceFabricationFailedError, /403 Forbidden/)
        end

        it 'cannot be used to commit via the API', testcase: 'https://gitlab.com/gitlab-org/gitlab/-/quality/test_cases/347861' do
          expect do
            Resource::Repository::Commit.fabricate_via_api! do |commit|
              commit.api_client = @user_api_client
              commit.project = @different_project
              commit.branch = "new_branch_#{SecureRandom.hex(8)}"
              commit.start_branch = @different_project.default_branch
              commit.commit_message = 'Add new file'
              commit.add_files([{ file_path: "text-#{SecureRandom.hex(8)}.txt", content: 'new file' }])
            end
          end.to raise_error(Resource::ApiFabricator::ResourceFabricationFailedError, /403 Forbidden - You are not allowed to push into this branch/)
        end

        after(:all) do
          @different_project.remove_via_api!
        end
      end
    end
  end
end

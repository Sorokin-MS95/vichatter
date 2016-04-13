/**
 * Created by kated on 4/13/2016.
 */
angular.module('viChatter')
    .service('BuildObjectsService', BuildObjectsService);

BuildObjectsService.$inject = [/*'ProjectBuilder', 'ProjectStatusBuilder', 'SimpleClientBuilder', 'StateBuilder', 'SiteBuilder', 'AntennaBuilder', 'ChangeAntennaModelBuilder', 'ClientBuilder', 'ChangeClientModelBuilder', 'ChangeProjectModelBuilder', 'ChangeSiteModelBuilder', 'UserBuilder', 'ChangeUserModelBuilder', 'SimpleReportBuilder', 'ReportStatusBuilder', 'SimpleProjectBuilder'*/];

function BuildObjectsService(/*ProjectBuilder, ProjectStatusBuilder, SimpleClientBuilder, StateBuilder, SiteBuilder, AntennaBuilder, ChangeAntennaModelBuilder, ClientBuilder, ChangeClientModelBuilder, ChangeProjectModelBuilder, ChangeSiteModelBuilder, UserBuilder, ChangeUserModelBuilder, SimpleReportBuilder, ReportStatusBuilder, SimpleProjectBuilder*/) {


   /* function _buildAntenna(antennaData) {
        return AntennaBuilder.create(antennaData);
    }

    function _buildAntennaChangeModel(antenna) {
        return ChangeAntennaModelBuilder.create(antenna);
    }

    function _buildClient(clientData) {
        return ClientBuilder.create(clientData);
    }

    function _buildClientChangeModel(client) {
        return ChangeClientModelBuilder.create(client);
    }

    function _buildProject(project) {
        return ProjectBuilder.create(project);
    }

    function _buildProjects(projects) {
        var results = [];
        if (angular.isArray(projects)) {
            angular.forEach(projects, function (projectData) {
                results.push(ProjectBuilder.create(projectData));
            });
        }
        return results;
    }



    return {
        buildAntenna: _buildAntenna,
        buildAntennaChangeModel: _buildAntennaChangeModel,

        buildClient: _buildClient,
        buildClientChangeModel: _buildClientChangeModel,

        buildProject: _buildProject,
        buildProjects: _buildProjects
    };*/
}
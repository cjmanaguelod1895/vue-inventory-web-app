import http from '../common/http-common';

class CrudDataServices {
    login(endpointName, data) {
        return http().post(`/${endpointName}/`, data);
    }

    getAll(endpointName) {
        return http().get(`/${endpointName}/`);
    }

    get(endpointName, id) {
        return http().get(`/${endpointName}/${id}`);
    }

    create(endpointName, data) {
        return http().post(`/${endpointName}`, data);
    }

    update(endpointName, id, data) {
        return http().put(`/${endpointName}/${id}`, data);
    }

    deleteById(endpointName, id) {
        return http().delete(`/${endpointName}/${id}`);
    }

    deleteAll(endpointName) {
        return http().delete(`/${endpointName}`);
    }

    findByTitle(title) {
        return http().get(`/UserManagement?title=${title}`);
    }
}

export default new CrudDataServices();
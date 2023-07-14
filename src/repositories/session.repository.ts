import { Repository } from '../core/repository';

export class SessionRepository extends Repository {
  public async getLoginActivity() {
    const { body } = await this.client.request.send({
      method: 'GET',
      url: '/api/v1/session/login_activity/',
      qs: {
        device_id: this.client.state.uuid,
      },
    });

    return body;
  }

  public async avowLogin(loginId: string) {
    const { body } = await this.client.request.send({
      method: 'POST',
      url: '/api/v1/session/login_activity/avow_login/',
      form: {
        login_id: loginId,
      },
    });

    return body;
  }

  public async undiwAvowLogin(loginId: string) {
    const { body } = await this.client.request.send({
      method: 'POST',
      url: '/api/v1/session/login_activity/undo_avow_login/',
      form: {
        login_id: loginId,
      },
    });

    return body;
  }
}

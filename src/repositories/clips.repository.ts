import { Repository } from '../core/repository';

export class ClipsRepository extends Repository {
  public async seen(reels: string[]) {
    const finalSeenReelse = reels.map(id => {
      return { id };
    });
    //include media pk array
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/write_seen_state/',
      method: 'POST',
      form: this.client.request.sign({
        impressions: JSON.stringify(finalSeenReelse),
        _uuid: this.client.state.uuid,
      }),
    });

    return body;
  }
}

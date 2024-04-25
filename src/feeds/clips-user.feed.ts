import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import { ClipsFeedResponseItem, ClipsFeedResponseRootObject } from '../responses/clips.feed.response';

export class ClipsUserFeed extends Feed<ClipsFeedResponseRootObject, ClipsFeedResponseItem> {
  targetUserId: string;

  @Expose()
  private maxId: string;

  protected set state(response: ClipsFeedResponseRootObject) {
    this.moreAvailable = response.paging_info.more_available;
    this.maxId = response.paging_info.max_id;
  }

  async request(): Promise<ClipsFeedResponseRootObject> {
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/user/',
      form: {
        target_user_id: this.targetUserId,
        max_id: this.maxId,
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
      method: 'POST',
    });
    this.state = body;
    return body;
  }

  async items(): Promise<ClipsFeedResponseItem[]> {
    const res = await this.request();
    return res.items;
  }
}

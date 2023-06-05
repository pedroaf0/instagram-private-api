import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import { ClipsFeedResponseItem, ClipsFeedResponseRootObject } from '../responses/clips.feed.response';
import { ClipsFeedModule } from '../types/clips.options'

export class ClipsDiscoverFeed extends Feed<ClipsFeedResponseRootObject, ClipsFeedResponseItem> {
  module: ClipsFeedModule = 'explore_popular_major_unit';
  @Expose()
  private maxId?: string;

  protected set state(response: ClipsFeedResponseRootObject) {
    this.moreAvailable = response.paging_info.more_available;
    this.maxId = response.paging_info.max_id;
  } 

  async request(seenReels: string[]): Promise<ClipsFeedResponseRootObject> {
    const finalSeenReelse = seenReels.map(id => {
        return { id };
    });

    const { body } = await this.client.request.send({
        url: '/api/v1/clips/discover/',
        form: {
          max_id: this.maxId,
          seen_reels: finalSeenReelse,
          container_module: this.module,
          _csrftoken: this.client.state.cookieCsrfToken,
          _uuid: this.client.state.uuid,
        },
        method: 'POST',
      });

      this.state = body;

      return body;
  }

  async items(seenReels: string[] = []): Promise<ClipsFeedResponseItem[]> {
    const res = await this.request(seenReels);
    return res.items;
  }
}
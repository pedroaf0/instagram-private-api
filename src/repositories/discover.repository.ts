import { Repository } from '../core/repository';
import { DiscoverRepositoryChainingResponseRootObject } from '../responses/discover.repository.chaining.response';

export class DiscoverRepository extends Repository {
  /**
   * Gets the suggestions based on a user
   * @param targetId user id/pk
   */
  async chaining(targetId: string): Promise<DiscoverRepositoryChainingResponseRootObject> {
    const { body } = await this.client.request.send<DiscoverRepositoryChainingResponseRootObject>({
      url: '/api/v1/discover/chaining/',
      qs: {
        target_id: targetId,
      },
    });
    return body;
  }

  async clipsHome(): Promise<any> {
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/home/',
      form: {
        max_id: undefined,
        seen_reels: [],
        container_module: 'explore_popular_major_unit',
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
      method: 'POST',
    });
    return body;
  }

  async clipsDiscover(): Promise<any> {
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/discover/',
      form: {
        max_id: undefined,
        seen_reels: [],
        container_module: 'clips_viewer_clips_tab',
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
      method: 'POST',
    });
    return body;
  }

  async topicalExplore() {
    const { body } = await this.client.request.send({
      url: '/api/v1/discover/topical_explore/',
      qs: {
        is_prefetch: true,
        omit_cover_media: false,
        use_sectional_payload: true,
        timezone_offset: this.client.state.timezoneOffset,
        session_id: this.client.state.clientSessionId,
        include_fixed_destinations: false,
      },
    });
    return body;
  }

  async reportExploreMedia(mediaId: string) {
    const { body } = await this.client.request.send({
      url: '/api/v1/discover/explore_report/',
      qs: {
        m_pk: mediaId,
      }
    });
    return body;
  }

  async markSuSeen() {
    const { body } = await this.client.request.send({
      url: '/api/v1/discover/mark_su_seen/',
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      }),
    });
    return body;
  }

  async profileSuBadge() {
    const { body } = await this.client.request.send({
      url: '/api/v1/discover/profile_su_badge/',
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      }),
    });
    return body;
  }
}

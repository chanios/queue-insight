import { browser } from "$app/environment";

export interface BoardItem {
  board_location: string;
  board_name: string;
  board_picture_url: string;
  board_token: string;
  board_type: number;
  box_type_code: string;
  category_code: any;
  closed_reason: string;
  closed_reason_en: string;
  company_id: number;
  delivery_status: number;
  distance: number;
  distance_limit: number;
  happy_time_text: string;
  latitude: number;
  longitude: number;
  number_of_waiting: number;
  privilege_picture_list: any[];
  public_flag: number;
  queue_line_list: BoardItemQueueLineList[];
  queueing_status: number;
  reserve_close_time: string;
  reserve_flag: number;
  reserve_open_time: string;
  takehome_status: number;
}

export interface BoardItemQueueLineList {
  queue_line_id: number;
  queue_line_name: string;
  queue_line_type_no: number;
  seat_count_flag: number;
  seat_count_max: number;
  seat_count_min: number;
}

export interface reqBoardListRes {
  board_list: BoardItem[];
}

export interface BoardQueueResponse {
  result: number;
  result_desc: string;
  announce_data_list: any[];
  announce_list: any;
  announce_order_list: any;
  language_id: number;
  language2_id: number;
  last_call_queue_line_id: number;
  queue_line_list: BoardQueueLineList[];
  show_signage_flag: number;
}

export interface BoardQueueLineList {
  queue_line_id: number;
  queue_line_type_no: number;
  queue_line_name: string;
  queue_call_list: any[];
  queue_oldest_wait_list: BoardQueueOldestWaitList[];
  queue_latest_wait_list: any[];
  num_total_wait_queues: number;
}

export interface BoardQueueOldestWaitList {
  queue_id: number;
  full_name: string;
  picture_url?: string;
  queue_number: string;
  waiting_time: number;
  seat_count: number;
  show_customer_flag: number;
}
const originalFetch = fetch;
const ofetch = (url: string, options: RequestInit) => {
  if (!browser) {
    url = `http://localhost:3000${url}`;
  }
  return originalFetch(url, options);
};
class QueqClient {
  usertoken?: string;
  constructor(usertoken?: string) {
    this.usertoken = usertoken;
  }

  async reqBoardList(): Promise<reqBoardListRes> {
    return ofetch(`/api/q/reqBoardList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_size: 500,
        page_number: 1,
        latitude: "14",
        longitude: "100.5",
        search_text: "",
      }),
    }).then((res) => res.json());
  }

  async getBoardQueue(
    boardToken: string,
    limit: number,
  ): Promise<BoardQueueResponse> {
    return ofetch(`/api/q/reqQueueList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardToken,
        limit,
      }),
    }).then((res) => res.json());
  }
}

const client = new QueqClient();
export { client };

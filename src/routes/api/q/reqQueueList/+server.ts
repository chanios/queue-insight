const _involk = async (boardToken: string, limit: number) => {
  return fetch(`https://api1.queq.me/QueQ/QueQ_Board/reqQueueList.ashx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `total_item=${limit}&board_token=${encodeURIComponent(boardToken)}`,
  }).then((res) => res.text());
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const data = await request.json();
  return new Response(await _involk(data.boardToken, data.limit), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

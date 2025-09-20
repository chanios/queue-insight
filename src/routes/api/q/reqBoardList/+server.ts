const _involk = async (data: any) => {
  return fetch(`https://api1.queq.me/QueQ/Customer_v3/reqBoardList.ashx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.text());
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const data = await request.json();
  return new Response(await _involk(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export default function handler(request, response) {
  response.status(200).json({
    body: {a: "hello", b: "world"}
  });
}

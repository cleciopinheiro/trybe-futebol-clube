export default interface IResponseLogin {
  status: number;
  data: { token: string } | { message: string } | { role: string };
}

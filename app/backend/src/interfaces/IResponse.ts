export default interface IResponse {
  status: number;
  data: object | { token: string } | { message: string } | { role: string };
}

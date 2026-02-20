interface IToken {
  userId: string;
  token: string;
}

export type ITokenDoc = IToken &
  Document & {
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };

export default IToken;

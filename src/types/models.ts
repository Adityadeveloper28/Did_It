export type Proof = {
  id: string;
  text?: string;
  createdAt: string;
  imageUri?: string;
};

export type Action = {
  id: string;
  title: string;
  description?: string;
  proofs: Proof[];
};

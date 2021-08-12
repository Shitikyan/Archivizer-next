import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body as { query: string };
	
    res.send(query);
};

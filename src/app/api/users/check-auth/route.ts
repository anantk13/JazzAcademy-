// import { NextApiRequest, NextApiResponse } from 'next';
// import POST from 

// export default async function checkAuth(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const session = await getLoginSession(req);
//     res.status(200).json({ isAuthenticated: !!session });
//   } catch (error) {
//     res.status(401).json({ isAuthenticated: false });
//   }
// }
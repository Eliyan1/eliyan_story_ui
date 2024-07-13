import connectMongoDB from "@/libs/mongodb";
import CharGroup from "@/models/chargroup";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { 
        name: name,
        group: group   
    } = req.body;
    await connectMongoDB();
    await CharGroup.updateOne({name:req.query.name}, {name,group});
    res.status(200).json({message:"Group Updated"});
}
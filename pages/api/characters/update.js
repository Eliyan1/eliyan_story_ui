import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { 
        name: name, 
        hp: hp,
        maxhp:  maxhp,
        temphp: temphp,
        ac: ac,
        str: str,
        dex: dex,
        con: con,
        wis: wis,
        intel: intel,
        cha: cha,
        active: active,
        notes: notes     
    } = req.body;
    await connectMongoDB();
    console.log(req.query.id)
    console.log(req.body)
    await Character.findByIdAndUpdate(req.query.id, {name, hp, maxhp, temphp, ac, str, dex, con, wis, intel, cha, active, notes});
    res.status(200).json({message:"Character Updated"});
}
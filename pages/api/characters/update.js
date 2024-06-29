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
        notes: notes,
        group: group,
        url: url     
    } = req.body;
    await connectMongoDB();
    await Character.findByIdAndUpdate(req.query.id, {name, hp, maxhp, temphp, ac, str, dex, con, wis, intel, cha, active, notes, group, url});
    res.status(200).json({message:"Character Updated"});
}
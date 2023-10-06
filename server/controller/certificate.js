const generateCertificate = require("../certificate");
const { getCertificate, setCertificate } = require("../contract");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");

const verifyCertificate = async (req, res) => {
    const certificates = await getCertificate(req.params.id);

    if (certificates[0] === "") {
        return res.render("unverified");
    }

    const date = new Date(parseInt(certificates[4])).toLocaleDateString();

    res.render("success", {
        email: certificates[1],
        name: certificates[2],
        course: certificates[3],
        date: date,
    });
}


const createCertificate = async (req, res) => {
    const { email, name, course } = req.body;

    if (!name || !course || !email) {
        return res.json({
            status: 400,
            message: "Invalid request body",
        });
    }

    const id = uuidv4();

    const date = Date.now();

    // Add certificate to blockchain
    await setCertificate(id, email, name, course, date + "");

    // Add certificate to database
    const user = await User.findOne({ email: req.user.email });


    if (!user) {
        return res.json({
            status: 400,
            message: "Invalid User",
        });
    }

    console.log(user.certificates);

    const certificate = {
        name,
        email,
        course,
        date: date,
        url: id + ".pdf",
    };

    user.certificates = user.certificates ? [...user.certificates, certificate] : [certificate];

    await user.save();

    // Generate PDF
    await generateCertificate(id, name, course, Date.now());

    console.log(id);

    res.json({
        status: 200,
        message: "Certificate added successfully",
        url: id + ".pdf",
    });
}


module.exports = { verifyCertificate, createCertificate };
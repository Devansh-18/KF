
const { contactUsEmail } = require("../mail/templates/contactUsEmail")
const { queryNotify } = require("../mail/templates/queryNotify")


const mailSender = require("../utils/mailSender")



exports.contactUsController = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, state, subject } = req.body
    console.log(req.body)
    try {
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstname, lastname, message, phoneNo, state, subject)
        )
        const emailResforTeam = await mailSender(
            "devanshdubey54321@gmail.com",
            "New Query ",
            queryNotify(email, firstname, lastname, message, phoneNo, state, subject)
        )
        console.log("Email Res ", emailRes)
        return res.json({
            success: true,
            message: "Email send successfully",
        })
    } catch (error) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
            success: false,
            message: "Something went wrong...",
        })
    }
}

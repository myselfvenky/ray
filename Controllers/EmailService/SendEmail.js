import nodemailer from "nodemailer";
export const sendEmail = async (from, to, subject, text, html) => {

    var nm_inst = nodemailer.createTransport({
        host: 'box.varcsoft.com',
        port: 465,
        auth: {
            user: 'venkateshdonthula@varcsoft.com',
            pass: 'venky@0308'
        }
    });

    const textBody = {
        text: text,
    }
    const htmlBody = {
        html: html,
    }
    const finalBody = html ? htmlBody : textBody

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        ...finalBody
    };
    nm_inst.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error
        } else {
            console.log('Email sent: ' + info.response);
            return info.response
        }
    });
}

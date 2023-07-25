const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tprojectemail1234@gmail.com',
        subject: "Welcome to TouristHub",
        text: `Hi ${name}, We are very delighted to welcome you in our TouristHub family.
        Please feel free to contact us at tprojectemail1234@gmail.com`
    })
}

const addedTouristHubEmail = (touristHubInfo) => {

   sgMail.send({
       to: touristHubInfo.author.email,
       from: 'tprojectemail1234@gmail.com',
       subject: "Added A TouristHub",
       text: `Hi ${touristHubInfo.author.username},
        We are here to inform you that you have successfully added 
        ${touristHubInfo.name} of price ${touristHubInfo.price}.
         Please feel free to contact us at tprojectemail1234@gmail.com`
   })
}

const updatedTouristHubEmail = (touristHubInfo) => {

   sgMail.send({
       to: touristHubInfo.author.email,
       from: 'tprojectemail1234@gmail.com',
       subject: "Updated A Campground",
       text: `Hi ${touristHubInfo.author.username},
        We are here to inform you that you have successfully updated 
        ${touristHubInfo.name} of price ${touristHubInfo.price}.
         Please feel free to contact us at tprojectemail1234@gmail.com`
   })
}

const deletedTouristHubEmail = (touristHubInfo) => {

   sgMail.send({
       to: touristHubInfo.author.email,
       from: 'tprojectemail1234@gmail.com',
       subject: "Deleted A Campground",
       text: `Hi ${touristHubInfo.author.username},
        We are here to inform you that you have successfully deleted
        ${touristHubInfo.name} of price ${touristHubInfo.price}.
         Please feel free to contact us at tprojectemail1234@gmail.com`
   })
}

module.exports = {
    sendWelcomeEmail,
    addedTouristHubEmail,
    updatedTouristHubEmail,
    deletedTouristHubEmail
}
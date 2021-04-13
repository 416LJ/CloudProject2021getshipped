import shippoClient from 'shippo';
import sg from '@sendgrid/mail';
import withSession from '../../lib/withSession';

sg.setApiKey(process.env.SEND_GRID_API);
const shippo = shippoClient("shippo_live_171632f9106cc15819e70ac5e162a29dbb803fde");

const getRatesHTML = rates => {
  let html = "";
  const line = (label, value) => `<div><b>${label}: </b>${value}</div>`
  for (const {amount_local, currency_local, provider, duration_terms} of rates) {
    html += line("Provider", provider) 
    + line("Cost", currency_local+amount_local)
    + line("Duration", duration_terms) + "<br />";
  }
  return html;
}

const handler = withSession(async (req, res) => {
  const { name } = req.session.get("user");
  const { origin, destination, length, width, height, weight, email } = req.body;
  const { rates } = await shippo.shipment.create({
    address_from: {
      ...origin,
      name,
      email,
      phone: "4159876543",
    },
    address_to: {
      ...destination,
      name,
      email,
      phone: "4159876543",
    },
    parcels: {
      length,
      width,
      height,
      weight,
      distance_unit: "cm",
      mass_unit: "g",
    }
  });
  console.log(JSON.stringify(rates, null, 2));
  const ratesHTML = rates.length > 0 ? getRatesHTML(rates) : "We were unable to find any rates for this shipment."

  await sg.send({
    to: email,
    from: "ladchumeharan.jeyasingsm@uoit.net",
    subject: "GetShipped - Shipment Info",
    html: `<div>Hello ${name},</div><br /><div><b>Rates</b></div>${ratesHTML}`
  })

  res.status(200).json({});
});


export default handler;
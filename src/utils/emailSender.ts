import nodemailer from 'nodemailer';
import config from '../config';
export const emailSender = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'niazahmed6414@gmail.com',
      pass: 'vrkn mmpr llux nyqz',
    },
  });

  await transporter.sendMail({
    from: 'niazahmed6414@gmail.com', // sender address
    to, // list of receivers
    subject: 'reset your password within 10 mins', // Subject line
    text: '', // plain text body
    html, // html body
  });
};

import withSession from '../../lib/withSession';

const logout = withSession(async (req, res) => {
    req.session.destroy();
    res.redirect("/")
});

export default logout;
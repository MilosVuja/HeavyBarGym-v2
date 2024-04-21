exports.getMainPage = (req, res,) => {
  res.status(200).render('main')
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login')
}

exports.getProfilePage = (req, res) => {
  res.status(200).render('profile')
}

exports.getGroupClassPage = (req, res,) => {
  res.status(200).render('groupClassBooking')
}
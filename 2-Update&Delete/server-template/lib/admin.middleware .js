
// SECURITY GUARD (=Türsteher)
export const isAdmmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "You are not an admin!",
    }); // 403 -no permission / forbidden
  }
  next();   // user is 'admin' => move forward
};

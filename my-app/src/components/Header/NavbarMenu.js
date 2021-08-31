const NavBarMenu = () => {
  return (
    <div className="flex flex-col justify-center text-center space-y-2">
      <div className="border-b-2 border-base-300">
        <span className="text-2xl leading-relaxed">หน้าแรก</span>
      </div>
      <div className="border-b-2 border-base-300">
        <span className="text-2xl leading-relaxed">ข้อมูลส่วนตัว</span>
      </div>
      <div className="border-b-2 border-base-300">
        <span className="text-2xl leading-relaxed">เกี่ยวกับเรา</span>
      </div>
      <div>
        <span className="text-2xl leading-relaxed">ออกจากระบบ</span>
      </div>
    </div>
  );
};
export default NavBarMenu;

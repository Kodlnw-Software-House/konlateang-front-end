import Card from "../../components/ui/Card";
import ped from "../../assets/pedyim.jpg";
import bg_hospital from "../../assets/bg_hospital.jpg";

const TeamMember = (props) => {
  return (
    <div className="flex-col hero-content my-2 lg:flex-row lg:justify-around">
      <img src={ped} className="max-w-xs max-h-96 rounded-3xl" alt="pic" />
      <div className="text-center md:text-left">
        <h1 className="mb-2 text-3xl font-bold">{props.fname}</h1>
        <p className="text-xl mb-5">{props.task}</p>
        <button className="btn btn-sm btn-ghost">Facebook</button>
        <button className="btn btn-sm btn-ghost">Github</button>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const team = [
    { fname: "Nachanon Montikanon", task: "Front-end Developer" },
    { fname: "Thanapat Leng", task: "Front-end Developer" },
    { fname: "Punnapop Gun", task: "Front-end Developer" },
  ];
  return (
    <div>
      <div
        className="bg-cover bg-clip-content "
        style={{ backgroundImage: `url(${bg_hospital})` }}
      >
        <Card>
          <div className="text-left m-4">
            <p className="text-4xl font-bold p-2">
              "คนละเตียง <br />
              คือสื่อกลางระหว่าง
              <br />
              ผู้ป่วยและศูนย์พักคอย
              <br />
              อย่างแท้จริง."
            </p>
          </div>
          <div className="pt-36 pb-3 ">
            <p className="text-lg break-words text-black shadow-2xl p-2 hover:bg-black hover:bg-opacity-50 hover:text-primary-content">
              <span className="text-2xl p-2">เว็บแอพพลิเคชั่น</span>
              สำหรับช่วยเหลือ ผู้ป่วยติดเชื้อ Covid-19 ในการลงทะเบียนจองเตียง
              จากศูนย์พักคอยต่างๆรวมไปถึงโรงพยาบาลที่เปิดรับ
              เพื่อให้ผู้ป่วยที่รักษาตนเองอยู่ที่บ้านลดความเสี่ยงในการแพร่กระจายเชื้อ
              โดยการจัดหาเตียง
              และช่วยบรรเทาอาการผู้ป่วยที่รุนแรงให้ถึงมือแพทย์ให้ได้ไวที่สุด
            </p>
          </div>
        </Card>
      </div>

      <div className="min-h-screen">
        <div className="bg-primary p-4">
          <p className="text-4xl text-center text-primary-content">
            MEET THE TEAM
          </p>
        </div>
        <div className="bg-blue-50">
          {team.map((item) => (
            <TeamMember key={item.fname} fname={item.fname} task={item.task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

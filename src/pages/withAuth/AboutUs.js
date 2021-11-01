import bg_hospital from "../../assets/bg_hospital.jpg";
import jj from "../../assets/jj.jpg";
import leng from "../../assets/leng.jpg";
import gun from "../../assets/gun.jpg";
const TeamMember = (props) => {
  return (
    <div class="w-full bg-gray-50 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
      <div>
        <img
          class="object-center object-cover h-96 w-full"
          src={props.img}
          alt="photo"
        />
      </div>
      <div class="text-center pt-8 pb-4 sm:pt-6">
        <p class="text-xl text-gray-700 font-bold mb-2">{props.fname}</p>
        <p class="text-base text-gray-400 font-normal">{props.task}</p>
      </div>
      <div className="space-x-2 mb-5">
        <a
          href={props.fb}
          target="_blank"
          rel="noreferrer nofollow"
          className="btn btn-md btn-primary"
        >
          Facebook
        </a>
        <a
          href={props.gh}
          target="_blank"
          rel="noreferrer nofollow"
          className="btn btn-md btn-secondary"
        >
          Github
        </a>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const team = [
    {
      fname: "Nachanon Montikanon",
      task: "Front-end Developer and Database Management",
      img: jj,
      fb: "https://www.facebook.com/nachanon.montikanon/",
      gh: "https://github.com/kakajj",
    },
    {
      fname: "Thanapat Loharattanavisid",
      task: "Back-end Developer and Database Management",
      img: leng,
      fb: "https://www.facebook.com/lengg.tha",
      gh: "https://github.com/lengleng9090",
    },
    {
      fname: "Punnapop Chalor",
      task: "DevSecOps Developer",
      img: gun,
      fb: "https://www.facebook.com/profile.php?id=100011436772819",
      gh: "https://github.com/gun082544",
    },
  ];
  return (
    <div>
      <div
        id="who-are-we"
        className="hero min-h-screen bg-cover"
        style={{
          backgroundImage: `url(https://source.unsplash.com/1600x900/?teamwork,coding)`,
        }}
      >
        <div className="hero-overlay bg-opacity-95"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-xl lg:text-left md:max-w-2xl lg:max-w-4xl">
            <h1 className="mb-5 text-5xl font-bold text-sky-400 lg:text-7xl lg:mb-10">
              คนละเตียง
            </h1>
            <p className="text-xl lg:text-3xl">
              {" "}
              เว็บแอพพลิเคชั่น สำหรับช่วยเหลือผู้ป่วยติดเชื้อ Covid-19
              ในการลงทะเบียนจองเตียงจากศูนย์พักคอยที่เปิดรับ
              เพื่อให้ผู้ป่วยที่รักษาตนเองอยู่ที่บ้าน
              ลดความเสี่ยงในการแพร่กระจายเชื้อ
              และช่วยบรรเทาอาการผู้ป่วยที่รุนแรงให้ถึงมือแพทย์ไวที่สุด
            </p>
            <p className="my-2 text-4xl lg:my-10 text-center lg:hidden">⚬</p>
            <p className="mb-5 text-lg lg:text-right lg:text-xl">
              " สื่อกลางระหว่างผู้ป่วยและศูนย์พักคอย <br /> อย่างแท้จริง. "
            </p>
            <p className="hidden text-2xl lg:my-10 text-center lg:block">⚬</p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-primary p-4">
          <p className="text-4xl text-center text-primary-content">
            MEET THE TEAM
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((item) => (
              <TeamMember
                key={item.fname}
                fname={item.fname}
                task={item.task}
                img={item.img}
                fb={item.fb}
                gh={item.gh}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

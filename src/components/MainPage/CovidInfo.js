import { motion } from "framer-motion";
const CovidInfo = (props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-items-stretch">
      <div className="shadow overflow-hidden stats col-span-2 lg:h-44">
        <div className="stat bg-secondary bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, x: +800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="stat-title md:text-xl">ผู้ป่วยใหม่วันนี้</div>
            <div className="stat-value text-primary md:text-5xl">
              {props.newCase.toLocaleString() + " "}
              <span className="font-light text-xl">ราย</span>
            </div>
            <span className="font-normal text-sm sm:text-base stat-desc">
              *ข้อมูล ณ วันที่ {props.updateDate} น.
            </span>
          </motion.div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats ">
        <div
          className="stat bg-secondary bg-opacity-50"
          className="stat bg-green-200"
        >
          <motion.div
            initial={{ opacity: 0, x: +800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="stat-title md:text-xl">กลับบ้านวันนี้</div>
            <div className="stat-value text-success text-2xl md:text-5xl">
              {props.newRecovered.toLocaleString() + " "}
              <span className="font-light text-base md:text-xl">ราย</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div
          className="stat bg-secondary bg-opacity-50"
          className="stat bg-green-200"
        >
          <motion.div
            initial={{ opacity: 0, x: +800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="stat-title md:text-xl">กลับบ้านสะสม</div>
            <div className="stat-value text-lg  text-success md:text-5xl">
              {props.totalRecovered.toLocaleString() + " "}
              <span className="font-light text-base md:text-xl">ราย</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats lg:h-44">
        <div
          className="stat bg-secondary bg-opacity-50"
          className="stat bg-red-300"
        >
          <motion.div
            initial={{ opacity: 0, x: +800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="stat-title md:text-xl">เสียชีวิตวันนี้</div>
            <div className="stat-value text-2xl  text-error md:text-5xl">
              {props.newDeath.toLocaleString() + " "}
              <span className="font-light text-base md:text-xl">ราย</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div
          className="stat bg-secondary bg-opacity-50"
          className="stat bg-gray-200"
        >
          <motion.div
            initial={{ opacity: 0, x: +800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="stat-title md:text-xl">เสียชีวิตสะสม</div>
            <div className="stat-value text-lg md:text-5xl">
              {props.totalDeath.toLocaleString() + " "}
              <span className="font-light text-base md:text-xl">ราย</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CovidInfo;

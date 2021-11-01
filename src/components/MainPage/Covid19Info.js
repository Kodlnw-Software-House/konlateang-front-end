const CovidInfo = (props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-items-stretch">
      <div className="shadow overflow-hidden stats col-span-2 lg:h-44">
        <div className="stat bg-secondary bg-opacity-50">
          <div className="stat-title md:text-xl">ผู้ป่วยใหม่วันนี้</div>
          <div className="stat-value text-primary md:text-5xl">
            {props.newCase.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
          <span className="font-normal text-base stat-desc">
            *ข้อมูล ณ วันที่ {props.updateDate} น.
          </span>
        </div>
      </div>
      <div className="shadow overflow-hidden stats ">
        <div className="stat bg-green-200">
          <div className="stat-title md:text-xl">กลับบ้านวันนี้</div>
          <div className="stat-value text-success text-2xl md:text-5xl">
            {props.newRecovered.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-green-200">
          <div className="stat-title md:text-xl">กลับบ้านสะสม</div>
          <div className="stat-value text-2xl  text-success md:text-5xl">
            {props.totalRecovered.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats lg:h-44">
        <div className="stat bg-red-300">
          <div className="stat-title md:text-xl">เสียชีวิตวันนี้</div>
          <div className="stat-value text-error lg:text-5xl">
            {props.newDeath.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-gray-200">
          <div className="stat-title md:text-xl">เสียชีวิตสะสม</div>
          <div className="stat-value text-2xl md:text-4xl lg:text-5xl">
            {props.totalDeath.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidInfo;

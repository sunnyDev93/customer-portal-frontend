import React, { useMemo } from 'react';

interface ApproximateServiceScheduleProps {
  plan: 'PRO' | 'BASIC' | 'PREMIUM' | 'PRO PLUS';
  isHavingBorderTop?: boolean;
}

const SeperatorCaret = () => {
  return (
    <div className="flex justify-start items-center w-full">
      <div className="h-[1px] w-full bg-[#77856E]"></div>
      <span className="fa-solid fa-play-pause fa-fw fa-lg margin-right-sm relative left-[-1px]">
        <svg enableBackground="new 0 0 14 29" height="10px" id="Layer_1" version="1.1" viewBox="0 0 14 29" width="7px">
          <polygon fill="#77856E" points="0,28.524 14.35,14.175 0,-0.175 " />
        </svg>
      </span>
    </div>
  );
};

const InsectIcon = () => {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.99218 19.5391C6.4401 19.5391 5.91666 19.4036 5.42187 19.1328C4.92708 18.8672 4.48697 18.5 4.10156 18.0312C3.71614 17.5677 3.41145 17.0417 3.1875 16.4531C2.96875 15.8646 2.85937 15.25 2.85937 14.6094C2.85937 14.4115 2.875 14.2292 2.90625 14.0625C2.9427 13.8958 2.99479 13.7422 3.0625 13.6016C2.95312 13.6328 2.84114 13.6641 2.72656 13.6953C2.61718 13.7214 2.50781 13.75 2.39843 13.7812C2.1276 13.8542 1.94531 13.9531 1.85156 14.0781C1.76302 14.1979 1.73697 14.375 1.77343 14.6094L2.34375 18.3516C2.3802 18.5755 2.33854 18.75 2.21875 18.875C2.10416 19 1.95572 19.0625 1.77343 19.0625C1.58072 19.0625 1.43489 19.0052 1.33593 18.8906C1.24218 18.7812 1.18229 18.6302 1.15625 18.4375L0.51562 14.3828C0.442704 13.9245 0.502599 13.5651 0.695308 13.3047C0.888016 13.0391 1.23697 12.849 1.74218 12.7344L5.27343 11.9141V11.8359C5.10156 11.7526 4.96093 11.638 4.85156 11.4922C4.74218 11.3411 4.66145 11.1771 4.60937 11L2.21093 10.6562C1.72135 10.5885 1.36197 10.4193 1.13281 10.1484C0.908849 9.8776 0.79687 9.5 0.79687 9.01562V6.3125C0.79687 6.125 0.848954 5.97917 0.95312 5.875C1.05729 5.76562 1.20312 5.71094 1.39062 5.71094C1.57812 5.71094 1.72395 5.76562 1.82812 5.875C1.93229 5.97917 1.98437 6.125 1.98437 6.3125V8.77344C1.98437 9.04948 2.05468 9.24479 2.19531 9.35938C2.33593 9.46875 2.53385 9.54167 2.78906 9.57812L4.57812 9.82031C4.61979 9.70052 4.67708 9.58854 4.75 9.48438C4.82812 9.38021 4.92187 9.29167 5.03125 9.21875V9.14062C4.36458 9.02083 3.84895 8.76823 3.48437 8.38281C3.125 7.99219 2.94531 7.5 2.94531 6.90625C2.94531 6.40625 3.03385 5.92969 3.21093 5.47656C3.39322 5.02344 3.64062 4.6224 3.95312 4.27344L3.89843 4.23438C3.51822 3.96354 3.29427 3.63542 3.22656 3.25C3.15885 2.85938 3.24739 2.44792 3.49218 2.01562L3.95312 1.25781C4.09375 1.0026 4.28125 0.875 4.51562 0.875C4.67708 0.875 4.80989 0.927083 4.91406 1.03125C5.02343 1.13542 5.07812 1.26302 5.07812 1.41406C5.07812 1.48177 5.07031 1.54167 5.05468 1.59375C5.03906 1.64583 5.01041 1.71094 4.96875 1.78906L4.5625 2.40625C4.43229 2.60938 4.36979 2.79688 4.375 2.96875C4.38541 3.14062 4.46875 3.29688 4.625 3.4375C4.64583 3.45312 4.66666 3.47135 4.6875 3.49219C4.71354 3.51302 4.73697 3.52865 4.75781 3.53906C5.07552 3.32552 5.42447 3.15885 5.80468 3.03906C6.18489 2.91406 6.58072 2.85156 6.99218 2.85156C7.40885 2.85156 7.80989 2.91406 8.19531 3.03906C8.58072 3.15885 8.93489 3.32812 9.25781 3.54688C9.28385 3.53125 9.30729 3.51562 9.32812 3.5C9.34895 3.47917 9.36979 3.46094 9.39062 3.44531C9.55208 3.30469 9.63541 3.14844 9.64062 2.97656C9.64583 2.79948 9.58593 2.60938 9.46093 2.40625L9.05468 1.78906C9.00781 1.71094 8.97656 1.64583 8.96093 1.59375C8.95052 1.54167 8.94531 1.48177 8.94531 1.41406C8.94531 1.26302 8.99739 1.13542 9.10156 1.03125C9.21093 0.927083 9.34635 0.875 9.50781 0.875C9.73697 0.875 9.92447 1.0026 10.0703 1.25781L10.5312 2.01562C10.776 2.44792 10.8646 2.85938 10.7969 3.25C10.7292 3.63542 10.5052 3.96354 10.125 4.23438L10.0547 4.28906C10.362 4.63802 10.6016 5.03646 10.7734 5.48438C10.9505 5.93229 11.0391 6.40625 11.0391 6.90625C11.0391 7.5 10.8594 7.99219 10.5 8.38281C10.1406 8.76823 9.6276 9.02083 8.96093 9.14062V9.21875C9.0651 9.29167 9.15625 9.38021 9.23437 9.48438C9.3125 9.58854 9.37239 9.70052 9.41406 9.82031L11.2031 9.57812C11.4583 9.54167 11.6562 9.46875 11.7969 9.35938C11.9375 9.24479 12.0078 9.04948 12.0078 8.77344V6.3125C12.0078 6.125 12.0599 5.97917 12.1641 5.875C12.2682 5.76562 12.4141 5.71094 12.6016 5.71094C12.7891 5.71094 12.9349 5.76562 13.0391 5.875C13.1432 5.97917 13.1953 6.125 13.1953 6.3125V9.01562C13.1953 9.5 13.0807 9.8776 12.8516 10.1484C12.6276 10.4193 12.2708 10.5885 11.7812 10.6562L9.38281 11C9.33072 11.1771 9.25 11.3411 9.14062 11.4922C9.03125 11.638 8.89062 11.7526 8.71875 11.8359L8.72656 11.9141L12.25 12.7344C12.75 12.849 13.0963 13.0391 13.2891 13.3047C13.487 13.5651 13.5495 13.9245 13.4766 14.3828L12.8359 18.4375C12.8047 18.6302 12.7422 18.7812 12.6484 18.8906C12.5547 19.0052 12.4115 19.0625 12.2187 19.0625C12.0365 19.0625 11.8854 19 11.7656 18.875C11.651 18.75 11.612 18.5755 11.6484 18.3516L12.2187 14.6094C12.2552 14.375 12.2266 14.1979 12.1328 14.0781C12.0443 13.9531 11.8646 13.8542 11.5937 13.7812C11.4844 13.75 11.3724 13.7214 11.2578 13.6953C11.1484 13.6641 11.0365 13.6328 10.9219 13.6016C10.9896 13.7422 11.0417 13.8958 11.0781 14.0625C11.1146 14.2292 11.1328 14.4115 11.1328 14.6094C11.1328 15.25 11.0208 15.8646 10.7969 16.4531C10.5781 17.0417 10.276 17.5677 9.89062 18.0312C9.5052 18.5 9.0625 18.8672 8.5625 19.1328C8.0677 19.4036 7.54427 19.5391 6.99218 19.5391Z"
        fill="#77856E"
      />
    </svg>
  );
};

export const ApproximateServiceSchedule: React.FC<ApproximateServiceScheduleProps> = ({ plan, isHavingBorderTop = true }) => {
  return (
    <div className={`bg-white mt-3 relative ${isHavingBorderTop ? 'border-t-[1px] border-[#D1D5DB]' : ''} pt-4`}>
      {plan === 'BASIC' && (
        <>
          <div className="leading-[24px] text-[#77856E] text-[12px] font-semibold mb-[8px]">Approximate service calendar</div>
          <div className="mb-[10px]">
            <div className="rounded-[6px] bg-[#F5F7ED] border border-[#77856E] pl-[30px] pr-[30px] pt-[18px] pb-[8px] mb-[8px]">
              <div className="flex justify-between items-center mb-[8px]">
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="flex justify-start items-center text-[#77856E]">
                  <InsectIcon />
                  <span className="text-[18px]">+</span>
                </div>
              </div>
              <div className="text-[#77856E] text-[12px] text-center">January - December (every 50-80 days)</div>
            </div>
            <div className="italic text-[#4B5563] leading-[24px] text-[12px]">(approx. number of treatments shown in a one year view)</div>
          </div>
        </>
      )}

      {(plan === 'PRO' || plan === 'PRO PLUS') && (
        <>
          <div className="leading-[24px] text-[#77856E] text-[12px] font-semibold mb-[8px]">Approximate service calendar</div>
          <div className="mb-[10px]">
            <div className="rounded-[6px] bg-[#F5F7ED] border border-[#77856E] pl-[30px] pr-[30px] pt-[18px] pb-[8px] mb-[8px]">
              <div className="flex justify-between items-center mb-[8px]">
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[26%]">
                  <SeperatorCaret />
                </div>
                <div className="flex justify-start items-center text-[#77856E]">
                  <InsectIcon />
                  <span className="text-[18px]">+</span>
                </div>
              </div>
              <div className="text-[#77856E] text-[12px] text-center">April - October (every 30-60 days)</div>
            </div>
            <div className="rounded-[6px] bg-[#F5F7ED] border border-[#77856E] pl-[30px] pr-[30px] pt-[18px] pb-[8px] mb-[16px]">
              <div className="flex justify-between items-center mb-[8px]">
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[43%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[43%]">
                  <SeperatorCaret />
                </div>
                <div className="flex justify-start items-center text-[#77856E]">
                  <InsectIcon />
                  <span className="text-[18px]">+</span>
                </div>
              </div>
              <div className="text-[#77856E] text-[12px] text-center">November - March (every 50-80 days)</div>
            </div>

            <div className="italic text-[#4B5563] leading-[24px] text-[12px]">(approx. number of treatments shown in a one year view)</div>
          </div>
        </>
      )}

      {plan === 'PREMIUM' && (
        <>
          <div className="leading-[24px] text-[#77856E] text-[12px] font-semibold mb-[8px]">Approximate service calendar</div>
          <div className="mb-[10px]">
            <div className="rounded-[6px] bg-[#F5F7ED] border border-[#77856E] pl-[30px] pr-[30px] pt-[18px] pb-[8px] mb-[8px]">
              <div className="flex justify-between items-center mb-[8px]">
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[15%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[15%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[15%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[15%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[15%]">
                  <SeperatorCaret />
                </div>
                <div className="flex justify-start items-center text-[#77856E]">
                  <InsectIcon />
                  <span className="text-[18px]">+</span>
                </div>
              </div>
              <div className="text-[#77856E] text-[12px] text-center">April - October (every 20-40 days)</div>
            </div>
            <div className="rounded-[6px] bg-[#F5F7ED] border border-[#77856E] pl-[30px] pr-[30px] pt-[18px] pb-[8px] mb-[16px]">
              <div className="flex justify-between items-center mb-[8px]">
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[43%]">
                  <SeperatorCaret />
                </div>
                <div className="">
                  <InsectIcon />
                </div>
                <div className="w-[43%]">
                  <SeperatorCaret />
                </div>
                <div className="flex justify-start items-center text-[#77856E]">
                  <InsectIcon />
                  <span className="text-[18px]">+</span>
                </div>
              </div>
              <div className="text-[#77856E] text-[12px] text-center">November - March (every 50-80 days)</div>
            </div>

            <div className="italic text-[#4B5563] leading-[24px] text-[12px]">(approx. number of treatments shown in a one year view)</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApproximateServiceSchedule;

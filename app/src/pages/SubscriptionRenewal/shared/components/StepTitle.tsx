import classNames from 'classnames';

export type StepTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

const StepTitle = ({ title, subtitle, className }: StepTitleProps) => (
  <div className={classNames(className)}>
    <h5 className="mt-6 text-[24px] leading-[31px] font-GTSuper text-gray-500 italic">{title}</h5>
    {subtitle && <p className="mt-4 text-gray-900 italic">{subtitle}</p>}
  </div>
);

export default StepTitle;

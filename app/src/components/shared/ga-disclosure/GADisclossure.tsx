import { Disclosure } from '@headlessui/react';
import { AddIcon } from 'components/shared/icons/AddIcon';

export type ClossureItemType = {
  id: number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  isOpen?: boolean;
  onClickItem?: (id: number) => void;
};

interface GADisclossureProps {
  list?: ClossureItemType[];
}

const GADisclossure: React.FC<GADisclossureProps> = ({ list }) => {
  return (
    <div data-testid="disclossure-container" className="w-full">
      {list &&
        list.map((item: ClossureItemType, index: number) => (
          <Disclosure key={item.id} defaultOpen={item.isOpen}>
            <div onClick={() => item.onClickItem && item.onClickItem(item.id)} className="border-t border-t-gray-300">
              <Disclosure.Button className="pt-[20px] pb-[20px] flex w-full justify-between text-left">
                <span className="text-custom-10 font-medium	text-[16px] leading-[18px]">{item.title}</span>
                <AddIcon />
              </Disclosure.Button>
              <Disclosure.Panel className="pb-[16px]">
                <span className="font-light text-aptive-1000 text-[16px] leading-[20px]">{item.content}</span>
              </Disclosure.Panel>
            </div>
          </Disclosure>
        ))}
    </div>
  );
};

export default GADisclossure;

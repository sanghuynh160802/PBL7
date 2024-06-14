import { resultOptions } from '@/utils/filters'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface IProps {
  resultOptions: IResultOptions[]
  selected: IResultOptions
  setSelected: React.Dispatch<React.SetStateAction<IResultOptions>>
}

export default function SelectField({ selected, setSelected }: IProps) {
  return (
    <div className='w-60'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative px-4 font-bold text-white'>
          <Listbox.Button className='relative w-full py-2 pl-3 text-left shadow-md cursor-pointer rounded-xl sm:py-3 pr-14 bg-sky-600 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'>
            <span className='block truncate'>{selected.name}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <IoIosArrowDown className='w-5 h-5' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none'>
              {resultOptions.map((item, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.name}</span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

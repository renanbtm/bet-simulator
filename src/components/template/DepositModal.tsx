import { useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import useAuth from "../../data/hooks/useAuth"

interface DepositModalProps {
    toggleModal?: (boolean) => void
}

export default function DepositModal(props: DepositModalProps) {

    const ctx = useAuth()

    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {
                props.toggleModal(false)
                setOpen(false)
            }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:flex-1">
                                    <div className="mt-3 text-center sm:text-left flex-1">
                                        <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900 mb-2">
                                            Depóstio
                                        </Dialog.Title>
                                        <div className="mt-2 flex">
                                            <span>Digite quantos R$ você deseja depositar</span>
                                            <input type="number" name="deposit value" id="depositValueInput" onChange={e => setValue(+e.target.value)}
                                                className={`border-2 rounded-md pl-3`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col md:flex-row md:justify-end">
                                <button className={`md:w-40 bg-gray-300 hover:bg-gray-400 text-black rounded-lg px-4 py-3 mr-2`}
                                    onClick={() => {
                                        props.toggleModal(false)
                                        setOpen(false)
                                    }}>Cancelar</button>
                                <button className={`md:w-40 bg-green-500 hover:bg-green-600 text-black rounded-lg px-4 py-3`}
                                    onClick={() => {
                                        ctx.user.depositMoney(value)
                                        props.toggleModal(false)
                                        setOpen(false)
                                    }}>Depositar</button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
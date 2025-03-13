"use client"
import React from 'react'
import { auth } from '@/configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../auth-context';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {
    const { user } = useAuth();
    const router = useRouter();

    const onButtonPress = () => {
        signOut(auth).then(() => {
            router.replace('/')
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    }
    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.photoURL && <img src={user?.photoURL} alt='profile' className='w-6 h-6 rounded-full' />}
                </PopoverTrigger>
                <PopoverContent className='w-[100px] mx-w-sm'>
                    <Button variant={'ghost'} onClick={onButtonPress} className=''>Logout</Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar
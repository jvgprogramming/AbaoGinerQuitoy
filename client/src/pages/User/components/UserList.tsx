import { useEffect, useState, type FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../components/Table';
import type { UserColumns } from '../../../interfaces/UserColumns';
import UserService from '../../../services/UserService';
import Spinner from '../../../components/Spinner/Spinner';

interface UserListProps {
  onAddUser: () => void;
  onEditUser: (user: UserColumns | null ) => void;
  refreshKey: boolean
}

const UserList: FC<UserListProps> = ({ onAddUser, onEditUser, refreshKey }) => {
const [loadingUsers, setLoadingUsers] = useState(false)
const [users, setUsers] = useState<UserColumns[]>([])

const handleLoadUsers = async () => {
  try{
    setLoadingUsers(true)

    const response = await UserService.loadUsers()

    if(response.status === 200) {
      setUsers(response.data.users)
    }else {
      console.error('Unexpected status error occured during loading users:', response.status)
    }
  }catch(error) {
    console.error('Unexpected server error occured during loading users:', error)
  }finally {
    setLoadingUsers(false)
  }
};

const handleUserFullNameFormat = (user: UserColumns) => {
  let fullName = ''

  if (user.middle_name) {
    fullName = `${user.last_name} ${user.first_name} ${user.middle_name.charAt(0)}`
  } else {
    fullName = `${user.last_name} ${user.first_name}`
    
  }
  if (user.suffix_name) {
    fullName += ` ${user.suffix_name}`
  }
  return fullName
}

useEffect(() => {
  handleLoadUsers()
}, [refreshKey])


  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <caption className="mb-0">
              <div className="border-b border-gray-100">
                <div className="flex justify-end p-4">
                  <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                    onClick={onAddUser}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </caption>
            <TableHeader className="bg-blue-600 text-xs text-white">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-semibold tracking-wide"
                >
                  No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-left font-semibold tracking-wide"
                >
                  Full Name
                </TableCell>
                
                <TableCell
                  isHeader
                  className="px-5 py-3 text-left font-semibold tracking-wide"
                >
                  Gender
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-left font-semibold tracking-wide"
                >
                  Birth Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-left font-semibold tracking-wide"
                >
                  Age
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-semibold tracking-wide"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 text-sm text-gray-600">
              {loadingUsers ? (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-5 text-center">
                    <Spinner size="md"/>
                  </TableCell>
                </TableRow>
              ) : (
                 users.map((user, index) => (
                  <TableRow className="bg-white transition hover:bg-gray-50" key={index}>
                    <TableCell className="px-5 py-3 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-left">
                      {handleUserFullNameFormat(user)}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-left">
                      {user.gender?.gender ?? 'N/A'}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-left">
                      {user.birth_date}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-left">
                      {user.age}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <div className="flex items-center justify-center gap-4">
                        <button 
                        type="button" 
                        className="text-sm font-semibold text-green-600 hover:text-green-700"
                        onClick={() => onEditUser(user)}
                        >
                          Edit
                        </button>
                        <button 
                        type="button" 
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                        onClick={() => onEditUser(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                 ))
              )}
                
              
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserList;

import useUserStore from '../../stores/userStore';

export default function UserList() {
  const users = useUserStore((store) => store.users);

  const userListItems = users.map(
    ({ id, firstName, lastName, streetAddress, zipCode, city, email, phoneNumber }) => (
      <li
        key={id}
      >{`${firstName}, ${lastName}, ${streetAddress}, ${zipCode}, ${city}, ${email} ${phoneNumber}`}</li>
    )
  );

  return (
    <div>
      <h2>Users</h2>
      <ul>{userListItems}</ul>
    </div>
  );
}

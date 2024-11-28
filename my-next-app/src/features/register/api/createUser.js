//TODO REPASAR - INCOMPLETO
export async function createUser(user) {
  const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.json();
}

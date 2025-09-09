from magical_creature import MagicCreature
from magical_creature_dao import MagicalCreatureDAO
from db_connect import connect_db

# Creamos una instacia DAO 
dao = MagicalCreatureDAO(connect_db())

# Creamos una creatura nueva
dragon = MagicCreature(_id = None, _nombre = "Firagon", _vigor = 50, _poder_magico = 250)
#dao.create(dragon)

# Obtenemos dicha creatura
creature = dao.get(1)
print(creature)

# O buscamos todas
creatures = dao.get_all()
for creatura in creatures:
    print(creatura)

# En caso de que ejecutamos el script dos veces y creamos erroneamente la misma creatura dos veces, podemos modificarla
dao.update(3, MagicCreature(_id = None, _nombre = "Humano", _vigor = 100, _poder_magico = 0))

# O si en cambio, simplemente queremos eliminarla
#dao.delete(4)

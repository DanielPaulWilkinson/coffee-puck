dev:
	npm run dev


new_migration:
	echo "migration name=whatever must be provided"
	dbmate -e -d ./db/coffee/migrations -s ./db/coffee/schema.sql new ${name}

clean_db:
	dbmate -e DB_URL -d ./db/coffee/migrations -s ./db/coffee/schema.sql drop
	dbmate -e DB_URL -d ./db/coffee/migrations -s ./db/coffee/schema.sql up
	mysql -h {dbhost} -u ${dbuser} coffee < db/coffee/seed.sql

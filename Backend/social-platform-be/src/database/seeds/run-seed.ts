import { AppDataSource } from "../data-source-cli";
import { SeedService } from "./seed.service";

async function main() {
    const dataSource = AppDataSource;
    await dataSource.initialize();
    console.log('Database connected for seeding ✅');
    const seedService = new SeedService(dataSource);
    await seedService.runAll();
    await dataSource.destroy();
}

main().catch((err) => {
    process.exit(1);
})
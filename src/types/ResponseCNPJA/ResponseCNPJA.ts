export type ResponseCNPJA = {
    taxId: number,
    company: CompanyInfos,
    alias: string,
    emails: EmailsInfos[],
    phones: PhonesInfos[]
}

type CompanyInfos =
{
    name: string,
}

type EmailsInfos = {
    address: string
}

type PhonesInfos = {
    area: string,
    number: string
}
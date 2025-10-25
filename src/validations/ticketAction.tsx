import z from "zod";

const ACCEPTED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.zip', '.rar', '.pdf', '.docx', '.xls', '.xlsx'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes

const getFileExtension = (fileName: string): string => {
    return fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
};


export const ticketActionValidation = z.object({
    callId: z.int32("Tipo inválido do chamado!")
        .nonoptional("O chamado é obrigatório para o envio!"),

    userId: z.number("Tipo inválido pro usuário!")
        .nonoptional("É obrigatório um usuário a ação!"),

    description: z.string("A ação não pode ser vazia!")
        .max(2500, "A ação não pode ultrapassar 2500 caracteres!")
        .nonempty("A ação não pode ser vazia!")
        .nonoptional("A ação é obrigatória!"),

    arquivos: z
        .instanceof(FileList)
        .refine((file) => {
            for (let i = 0; i < file.length; i++) {
                var arquivo = file.item(i);
                if (arquivo) {
                    if (arquivo.size > MAX_FILE_SIZE) {
                        return false;
                    }
                }
                return true;
            }
        }, {
            message: `Um ou mais arquivos excede o limite máximo de envio. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        })
        .refine((file) => {
            for (let i = 0; i < file.length; i++) {
                var arquivo = file.item(i);
                if (arquivo) {
                    if (ACCEPTED_FILE_TYPES.includes(arquivo.type)) {
                        return true;
                    }
                    const extension = getFileExtension(arquivo.name);
                    return ACCEPTED_EXTENSIONS.includes(extension);
                }
            }
        }, {
            message: 'Formato de arquivo não suportado. Formatos aceitos: .jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlsx',
        })
        .optional(),

    statusAction: z.string("A ação deve ser pública ou interna!")
        .nonoptional("A ação deve ser pública ou interna!"),

})
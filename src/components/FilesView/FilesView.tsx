import { showError } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import type { ResponseFiles } from "@/types/ResponseAction/ResponseAction";
import { Download, File, FileText, Image, Video, Music, Archive } from "lucide-react";

type Files = {
    arquivos: ResponseFiles[]
}

export default function FilesView({ arquivos }: Files) {
    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
            return <Image className="w-5 h-5" />;
        }
        if (['mp4', 'avi', 'mov', 'mkv'].includes(ext || '')) {
            return <Video className="w-5 h-5" />;
        }
        if (['mp3', 'wav', 'ogg', 'flac'].includes(ext || '')) {
            return <Music className="w-5 h-5" />;
        }
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) {
            return <Archive className="w-5 h-5" />;
        }
        if (['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'].includes(ext || '')) {
            return <FileText className="w-5 h-5" />;
        }
        return <File className="w-5 h-5" />;
    };

    const handleDownload = async (arquivo: ResponseFiles) => {
        let url = await api.get(`api/files/download/${arquivo.id}`, {
            responseType: "blob"
        })
            .then(res => res.data)
            .catch(erro => showError(erro.response.data.error))

        

        // Cria URL temporária do blob
        var blobUrl = window.URL.createObjectURL(url);

        // Cria link e dispara download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = arquivo.name;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full">
            {arquivos.length > 0 ? (
                <div className="space-y-2">
                    {arquivos.map((arquivo, index) => (
                        <div
                            key={index}
                            onClick={() => handleDownload(arquivo)}
                            className="group flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 border border-gray-200 group-hover:border-blue-400 transition-colors">
                                    {getFileIcon(arquivo.name)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                        {arquivo.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-shrink-0 ml-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 border border-gray-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                    <Download className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 px-4 bg-gray-50 rounded-lg border border-gray-200">
                    <File className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm font-medium">Sem arquivos para listar</p>
                </div>
            )}
        </div>
    );
}
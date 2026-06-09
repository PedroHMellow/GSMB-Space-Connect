import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { User, MapPin, Sprout, Droplets, Ruler, Info, CreditCard } from 'lucide-react-native';

interface ProfileInfoProps {
  userData: {
    nome: string;
    cpf: string;
  };
  farmData: {
    nome: string;
    culturaAtual: string;
    areaTotalHectares: number;
    areaCultivoHectares: number;
    tipoSolo: string;
    irrigacaoAtiva: boolean;
    latitude: number;
    longitude: number;
  };
}

export default function ProfileInfoCard({ userData, farmData }: ProfileInfoProps) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 space-y-4">
        {/* Seção do Usuário */}
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-6">
            <View className="bg-green-100 p-3 rounded-2xl mr-4">
              <User size={24} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-gray-800">Dados do Produtor</Text>
          </View>
          
          <View className="space-y-4">
            <View>
              <Text className="text-gray-400 text-xs uppercase tracking-widest mb-1">Nome Completo</Text>
              <Text className="text-gray-900 text-lg font-medium">{userData?.nome || 'Não informado'}</Text>
            </View>
            <View className="flex-row items-center">
              <CreditCard size={16} color="#9ca3af" className="mr-2" />
              <Text className="text-gray-500">{userData?.cpf || '000.000.000-00'}</Text>
            </View>
          </View>
        </View>

        {/* Seção da Fazenda (FarmInfo) */}
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-6">
            <View className="bg-blue-100 p-3 rounded-2xl mr-4">
              <Sprout size={24} color="#2563eb" />
            </View>
            <Text className="text-xl font-bold text-gray-800">Minha Fazenda</Text>
          </View>

          <View className="space-y-4">
            <DetailRow icon={<Info size={18} color="#6b7280" />} label="Talhão" value={farmData?.nome} />
            <DetailRow icon={<Sprout size={18} color="#6b7280" />} label="Cultura" value={farmData?.culturaAtual} />
            <DetailRow icon={<Ruler size={18} color="#6b7280" />} label="Área Total" value={`${farmData?.areaTotalHectares} ha`} />
            <DetailRow 
              icon={<Droplets size={18} color="#6b7280" />} 
              label="Irrigação" 
              value={farmData?.irrigacaoAtiva ? "Ativa" : "Inativa"}
              valueStyle={farmData?.irrigacaoAtiva ? "text-green-600" : "text-red-500"}
            />
            
            <View className="pt-4 mt-4 border-t border-gray-50 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MapPin size={18} color="#9ca3af" className="mr-2" />
                <Text className="text-gray-400 text-sm italic">
                  {farmData?.latitude?.toFixed(4)}, {farmData?.longitude?.toFixed(4)}
                </Text>
              </View>
              <View className="bg-gray-100 px-3 py-1 rounded-full">
                <Text className="text-gray-600 text-xs font-bold">{farmData?.tipoSolo}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DetailRow({ icon, label, value, valueStyle = "text-gray-900" }: any) {
  return (
    <View className="flex-row justify-between items-center border-b border-gray-50 pb-3">
      <View className="flex-row items-center">
        <View className="mr-3">{icon}</View>
        <Text className="text-gray-500 font-medium">{label}</Text>
      </View>
      <Text className={`font-semibold ${valueStyle}`}>{value || 'N/A'}</Text>
    </View>
  );
}
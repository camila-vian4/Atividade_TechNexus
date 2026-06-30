package api.technexus.atv_technexus.service;

import api.technexus.atv_technexus.dto.ClienteRequestDTO;
import api.technexus.atv_technexus.dto.ClienteResponseDTO;
import api.technexus.atv_technexus.model.ClienteModel;
import api.technexus.atv_technexus.repository.ClienteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    public ClienteModel cadastrar(@Valid ClienteRequestDTO clienteDTO){
        if (repository.findByEmail(clienteDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Cliente já cadastrado! ❌");
        }

        ClienteModel cliente = new ClienteModel();

        cliente.setNome(clienteDTO.getNome());
        cliente.setEmail(clienteDTO.getEmail());
        cliente.setTelefone(clienteDTO.getTelefone());
        cliente.setCpf(clienteDTO.getCpf());

        return repository.save(cliente);
    }

    public List<ClienteResponseDTO> listar(){
        return repository
                .findAll()
                .stream()
                .map(c -> new ClienteResponseDTO(c.getId(), c.getNome(), c.getEmail(), c.getTelefone()))
                .toList();
    }


    public ClienteModel atualizar(Long id, ClienteRequestDTO clienteDTO) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Cliente não encontrado! 🔍");
        }

        ClienteModel novoCliente =  new ClienteModel();
        novoCliente.setId(id);
        novoCliente.setNome(clienteDTO.getNome());
        novoCliente.setEmail(clienteDTO.getEmail());
        novoCliente.setTelefone(clienteDTO.getTelefone());
        novoCliente.setCpf(clienteDTO.getCpf());

        return repository.save(novoCliente);
    }

    public void deletar(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Cliente não encontrado! 🔍");
        }

        repository.deleteById(id);
    }
}
